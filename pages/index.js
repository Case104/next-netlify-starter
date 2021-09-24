import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Post from "@components/Post";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>case 'BLOG': | jcase.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <div>
          {posts.map((post, idx) => {
            return <Post post={post} key={`post-${idx}`} />;
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
