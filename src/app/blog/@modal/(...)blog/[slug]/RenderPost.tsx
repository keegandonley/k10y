import { getComponentForKey, getKey } from "@/app/blog/util";
import styles from "./styles.module.css";
import { notFound } from "next/navigation";
import { getImageMetadata, parseSource, parseToProps } from "@/util/image";
import Image from "next/image";
import { BottomFade } from "@/components/BottomFade";
import { BUCKET_URL } from "@/util/r2";
import { H1 } from "@/components/Post/Heading/H1";
import ClientBack from "./ClientBack";

export default function RenderPost({ slug }: any) {
  const componentKey = getKey({ slug });

  if (!componentKey) {
    notFound();
  }

  const found = getComponentForKey({ key: componentKey });

  const Component = found.default;
  const title = found.title;
  const cover = found.cover;
  const metadata = getImageMetadata(parseSource(cover)[0]);

  if (!Component) {
    notFound();
  }

  return (
    <>
      <div className={styles.coverWrapper}>
        {cover ? (
          <Image
            src={`${BUCKET_URL}/${cover}`}
            alt="todo"
            fill
            priority
            {...parseToProps(metadata)}
          />
        ) : null}
        <BottomFade />
      </div>
      <article className={styles.article}>
        <ClientBack />
        <H1 className={styles.title}>{title}</H1>
        <Component />
      </article>
    </>
  );
}