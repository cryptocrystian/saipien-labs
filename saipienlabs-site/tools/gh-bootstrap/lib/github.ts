/**
 * GitHub REST + GraphQL API wrapper
 * Lightweight client using fetch for organization bootstrapping
 */

const GITHUB_API = 'https://api.github.com';
const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

export interface GitHubConfig {
  token: string;
  org: string;
  owner: string;
}

export interface RepoConfig {
  name: string;
  description: string;
  website?: string;
  topics?: string[];
  isPrivate?: boolean;
  defaultBranch?: string;
}

export interface FileContent {
  path: string;
  content: string;
  message: string;
  branch?: string;
}

export class GitHub {
  private config: GitHubConfig;

  constructor(config: GitHubConfig) {
    this.config = config;
  }

  private headers() {
    return {
      Authorization: `Bearer ${this.config.token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
  }

  /**
   * REST API request
   */
  async rest<T = any>(
    method: string,
    path: string,
    body?: any
  ): Promise<T> {
    const url = `${GITHUB_API}${path}`;
    const options: RequestInit = {
      method,
      headers: this.headers(),
    };

    if (body) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}\n${JSON.stringify(data, null, 2)}`
      );
    }

    return data;
  }

  /**
   * GraphQL API request
   */
  async graphql<T = any>(query: string, variables?: any): Promise<T> {
    const response = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        ...this.headers(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(
        `GraphQL error: ${JSON.stringify(data.errors, null, 2)}`
      );
    }

    return data.data;
  }

  // ============================================================================
  // ORG OPERATIONS
  // ============================================================================

  async getOrg() {
    return this.rest('GET', `/orgs/${this.config.org}`);
  }

  async updateOrg(settings: any) {
    return this.rest('PATCH', `/orgs/${this.config.org}`, settings);
  }

  async getDomainVerificationToken() {
    try {
      const data = await this.rest(
        'GET',
        `/orgs/${this.config.org}/domains/verification_token`
      );
      return data.token || null;
    } catch {
      return null;
    }
  }

  // ============================================================================
  // REPO OPERATIONS
  // ============================================================================

  async getRepo(name: string) {
    try {
      return await this.rest('GET', `/repos/${this.config.org}/${name}`);
    } catch {
      return null;
    }
  }

  async createRepo(config: RepoConfig) {
    return this.rest('POST', `/orgs/${this.config.org}/repos`, {
      name: config.name,
      description: config.description,
      homepage: config.website,
      private: config.isPrivate || false,
      has_issues: true,
      has_projects: false,
      has_wiki: false,
      auto_init: false,
    });
  }

  async updateRepo(name: string, config: Partial<RepoConfig>) {
    return this.rest('PATCH', `/repos/${this.config.org}/${name}`, {
      description: config.description,
      homepage: config.website,
      private: config.isPrivate,
      default_branch: config.defaultBranch,
    });
  }

  async setRepoTopics(name: string, topics: string[]) {
    return this.rest('PUT', `/repos/${this.config.org}/${name}/topics`, {
      names: topics,
    });
  }

  async getFileContent(name: string, path: string, branch = 'main') {
    try {
      return await this.rest(
        'GET',
        `/repos/${this.config.org}/${name}/contents/${path}?ref=${branch}`
      );
    } catch {
      return null;
    }
  }

  async createOrUpdateFile(name: string, file: FileContent) {
    const existing = await this.getFileContent(name, file.path, file.branch);
    const content = Buffer.from(file.content).toString('base64');

    return this.rest(
      'PUT',
      `/repos/${this.config.org}/${name}/contents/${file.path}`,
      {
        message: file.message,
        content,
        branch: file.branch || 'main',
        sha: existing?.sha,
      }
    );
  }

  async createOrUpdateFiles(name: string, files: FileContent[]) {
    const results = [];
    for (const file of files) {
      try {
        const result = await this.createOrUpdateFile(name, file);
        results.push({ path: file.path, status: 'success', result });
      } catch (error) {
        results.push({ path: file.path, status: 'error', error });
      }
    }
    return results;
  }

  // ============================================================================
  // BRANCH PROTECTION
  // ============================================================================

  async setBranchProtection(name: string, branch: string) {
    return this.rest(
      'PUT',
      `/repos/${this.config.org}/${name}/branches/${branch}/protection`,
      {
        required_status_checks: {
          strict: true,
          contexts: ['build', 'test', 'codeql'],
        },
        enforce_admins: true,
        required_pull_request_reviews: {
          dismiss_stale_reviews: true,
          require_code_owner_reviews: true,
          required_approving_review_count: 1,
        },
        restrictions: null,
        required_linear_history: false,
        allow_force_pushes: false,
        allow_deletions: false,
      }
    );
  }

  // ============================================================================
  // SECURITY SETTINGS
  // ============================================================================

  async enableVulnerabilityAlerts(name: string) {
    return this.rest(
      'PUT',
      `/repos/${this.config.org}/${name}/vulnerability-alerts`,
      {}
    );
  }

  async enableAutomatedSecurityFixes(name: string) {
    return this.rest(
      'PUT',
      `/repos/${this.config.org}/${name}/automated-security-fixes`,
      {}
    );
  }

  async enableCodeScanning(name: string) {
    // Code scanning is enabled via workflow files
    // This is a placeholder for potential API endpoints
    return Promise.resolve();
  }

  // ============================================================================
  // REPO TRANSFER
  // ============================================================================

  async transferRepo(repoName: string, fromOwner: string) {
    return this.rest('POST', `/repos/${fromOwner}/${repoName}/transfer`, {
      new_owner: this.config.org,
    });
  }
}
