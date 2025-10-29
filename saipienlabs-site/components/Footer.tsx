import Image from 'next/image';

export default function Footer() {
  const links = [
    { name: "Services", href: "#services" },
    { name: "Studio", href: "#studio" },
    { name: "Process", href: "#timeline" },
    { name: "Work", href: "#work" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer className="bg-obsidian border-t border-mist/5 py-12">
      <div className="container mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/saipien-labs-logo.png"
            alt="Saipien Labs"
            width={180}
            height={40}
            className="h-8 w-auto"
          />
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 mb-8 text-sm">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-mist/60 hover:text-mist transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Contact / timezone */}
        <div className="text-mist/60 text-sm mb-4">
          <p>hello@saipienlabs.com · Remote / US & EU friendly hours</p>
        </div>

        {/* Legal */}
        <div className="text-xs font-mono text-mist/40 pt-6 border-t border-mist/5">
          <p>saipien [labs] · AI dev pod · integration-first · governed</p>
        </div>
      </div>
    </footer>
  );
}
