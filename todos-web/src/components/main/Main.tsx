import { Layout, Skeleton } from "antd";
import { AddTask, Logo, Search, Tasks, User } from "../../components";
import { Suspense } from "react";

const { Header, Content } = Layout;

export const Main: React.FC = () => {
  return (
    <Layout className="main-layout">
      <Header className="header">
        <Suspense fallback={null}>
          <Logo />
          <Search />
          <User />
        </Suspense>
      </Header>
      <Content className="content">
        <div className="container">
          <AddTask />
          <Suspense fallback={<Skeleton />}>
            <Tasks />
          </Suspense>
        </div>
      </Content>
    </Layout>
  );
};
