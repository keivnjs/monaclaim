import Accordion from "components/layouts/Accordion";
import AccordionList from "./data.json";

const FAQSection: React.FC = () => {
  return (
    <section
      id="faq"
      className="w-full mx-auto py-32 px-2 sm:px-0 font-display"
    >
      <div className="max-w-3xl mx-auto">
        <img src="/assets/borders/faq.png" className="mx-auto" width={500} />
        <p className="text-lg sm:text-3xl text-center text-white mt-6 mb-10">
          Don’t hesitate to ask other questions in Discord
        </p>
      </div>
      <div className="max-w-5xl mx-auto space-y-5 px-2">
        {AccordionList.map((item, index) => (
          <Accordion
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
