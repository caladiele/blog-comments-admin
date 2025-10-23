import React from "react";
import "@/app/styles/resume-article.css";

type QA = {
  question: string;
  answer: string;
};

type ArticleSummaryProps = {
  title?: string;
  items: QA[];
};

export default function ArticleSummary({ title = "en résumé", items }: ArticleSummaryProps) {
  return (
    <aside className="article-summary">
      <div className="article-summary--wrapper">
        <div className="recipe-section-title">
        <svg
          className="wabisabi-fill"
          width="128"
          height="104"
          aria-hidden="true"
        >
          <use href="#wabisabi-shape" />
        </svg>
        <h2 className="article-summary--title">{title}</h2>
      </div>
        <dl className="article-summary--list">
            {items.map((qa, index) => (
            <div key={index} className="article-summary--list-block">
                <dt className="article-summary--list-question">{qa.question}</dt>
                <dd className="article-summary--list-answer">{qa.answer}</dd>
            </div>
            ))}
        </dl>
      </div>
    </aside>
  );
}