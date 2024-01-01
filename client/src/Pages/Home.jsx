import Layout from "../Layout/layout";
import PostCard from "../components/PostCard";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <PostCard />
      </div>
    </Layout>
  );
}
