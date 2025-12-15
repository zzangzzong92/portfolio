import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function ServicesSection() {
  const t = useTranslations("services");
  const servicesData = t.raw("services") as Array<{
    title: string;
    description: string;
  }>;

  const imagePaths = [
    "/erp_system.png",
    "/web_application.png",
    "/system_intergration.png",
    "/api.png",
    "/system_maintainence.png",
    "/cooperation.png",
    "/getintouch.png",
  ];

  const services = servicesData.map((service, index) => ({
    ...service,
    image: imagePaths[index],
  }));

  return (
    <section className="py-16 bg-white md:py-24">
      <div className="container px-4 mx-auto">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:mb-16">
            <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4">
              {t("title")}{" "}
              <span className="bg-[#FF4A60] text-white px-3 py-1 inline-block">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border-[3px] border-black rounded-[32px] overflow-hidden hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 min-h-[480px] flex flex-col group"
              >
                <div className="mb-6 -mx-[3px] -mt-[3px] overflow-hidden rounded-t-[29px] flex justify-center items-center bg-white py-8 h-[220px] md:h-[240px]">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={382}
                    height={328}
                    className="w-full h-full rounded-t-[29px] group-hover:scale-110 transition-transform duration-500 ease-out object-contain"
                  />
                </div>
                <div className="flex flex-col flex-1 px-8 pb-8 text-center">
                  <h3 className="text-[28px] leading-[40px] font-bold mb-3 text-[#0B0B0B]">
                    {service.title}
                  </h3>
                  <p className="text-[18px] leading-[30px] font-medium text-[#393939]">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-[#FFC224] border-[3px] border-black rounded-[32px] p-8 md:p-12 flex flex-col items-center justify-center text-center hover:translate-y-[-4px] transition-transform min-h-[480px] relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="mb-8">
                <Image
                  src="/getintouch.png"
                  alt="Get in touch"
                  width={92}
                  height={92}
                  className="w-[92px] h-[92px] object-contain"
                />
              </div>
              <h3 className="text-[28px] leading-[40px] font-bold mb-4 text-[#0B0B0B]">
                {t("getInTouchTitle")}
              </h3>
              <p className="text-[18px] leading-[30px] font-medium text-[#393939] mb-8">
                {t("getInTouchDescription")}
              </p>
              <Button className="bg-black text-white hover:bg-black/90 rounded-[16px] px-12 py-6 font-medium text-[18px] w-full max-w-[340px] h-[64px]">
                <Mail className="mr-2 w-5 h-5" />
                {t("getInTouchButton")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
