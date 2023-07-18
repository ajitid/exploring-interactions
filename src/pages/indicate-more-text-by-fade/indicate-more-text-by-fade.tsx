import css from "./indicate-more-text-by-fade.module.css";

// Related: scroll-padding-block https://twitter.com/pacocoursey/status/1630425455235940352?s=20

export const IndicateMoreTextByFade = () => {
  return (
    <div className="min-h-screen flex flex-center bg-zinc-900">
      <div className="max-w-3xl">
        <div className={css["code-block"]}>
          <pre>
            <code>
              You'll see a slight fade at the right end of this very long piece of text. This
              denotes that there's more content that you could scroll to. This fade width is equal
              or less than padding width.
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
