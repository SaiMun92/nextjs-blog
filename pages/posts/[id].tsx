import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // getStaticPaths - Nextjs pre-defined function
  // This function returns an array of possible values for id
  // Fallback documentation: https://nextjs.org/docs/pages/api-reference/functions/get-static-paths

  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // getStaticProps - Nextjs pre-defined function that allows you
  // to fetch data from an external source before rendering the page
  // to the user.
  // This function fetches the necessary data for the post with id.
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
