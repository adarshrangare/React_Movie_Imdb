import React from "react";
import "./style.css";
import { ContentWrapper } from "../../../components";
import { faqs } from "./faqs";
import AccordianItem from "./AccordianItem";

const Accordian = () => {
  return (
    <section className="faq">
      <ContentWrapper>
        <div className="heading">Frequently Ask Questions</div>
        <div className="accordian">
          {faqs.map((faq, index) => (
            <AccordianItem key={index} faq={faq} />
          ))}
        </div>
      </ContentWrapper>
    </section>
  );
};

export default Accordian;
