export function LogoMarquee() {
  const items = [
    { logo: "/company.png", alt: "company" },
    { logo: "/communication.png", alt: "communication" },
    { logo: "/business.png", alt: "business" },
    { logo: "/startup .png", alt: "startup" },
    { logo: "/cooperation.png", alt: "cooperation" },
    { logo: "/ERP.png", alt: "ERP" },
  ];

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-hidden bg-black h-40 flex items-center -rotate-[5deg] mt-32 mb-16 min-w-[120vw] -mx-[10vw] left-0">
        <div className="flex gap-16 items-center whitespace-nowrap animate-marquee">
          {[...duplicatedItems, ...duplicatedItems].map((item, index) => (
            <div key={index} className="flex flex-shrink-0 gap-4 items-center">
              <img
                src={item.logo || "/placeholder.svg"}
                alt={item.alt}
                className="w-auto h-28"
              />
              <span className="text-base font-semibold text-white">
                {item.alt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
