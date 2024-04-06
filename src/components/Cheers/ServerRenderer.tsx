import { getFullyQualifiedDeploymentUrl } from '@/util/deployment';
import { CheersClientRenderer } from './ClientRenderer';
import styles from './cheers.module.css';

interface CheersServerRendererProps {
  slug: string;
  location: string;
}

const getValue = async (slug: string): Promise<number> => {
  try {
    const { url, headers } = await getFullyQualifiedDeploymentUrl(
      `/api/cheers?slug=${slug}`,
    );
    const data = await fetch(url, {
      cache: 'no-store',
      headers,
    });

    const { count } = await data.json();

    return parseInt(count);
  } catch (ex) {
    console.error('Error for slug when getting cheers count', slug, ex);
    return 0;
  }
};

export const CheersServerRenderer = async ({
  slug,
  location,
}: CheersServerRendererProps) => {
  const count = await getValue(slug);
  return (
    <div className={styles.container}>
      <CheersClientRenderer count={count} slug={slug} location={location} />
    </div>
  );
};
