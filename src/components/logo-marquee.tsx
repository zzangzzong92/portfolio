export function LogoMarquee() {
  const items = [
    { logo: "/company.png", alt: "company" },
    { logo: "/communication.png", alt: "communication" },
    { logo: "/startup .png", alt: "startup" },
    { logo: "/cooperation.png", alt: "cooperation" },
    { logo: "/ERP.png", alt: "ERP" },
  ]

  const duplicatedItems = [...items, ...items, ...items, ...items]

  return (
    <div className="overflow-hidden">
      <div className="relative overflow-hidden bg-black h-40 flex items-center -rotate-[5deg] mt-32 mb-16 min-w-[120vw] -mx-[10vw] left-0">
        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {[...duplicatedItems, ...duplicatedItems].map((item, index) => (
            <div key={index} className="flex items-center gap-4 flex-shrink-0">
              <img src={item.logo || "/placeholder.svg"} alt={item.alt} className="h-28 w-auto" />
              <span className="text-white text-base font-semibold">{item.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
