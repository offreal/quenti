import { useSession } from "next-auth/react";

import { HeadSeo } from "@quizfit/components/head-seo";
import { api } from "@quizfit/trpc";

import { Container, Stack } from "@chakra-ui/react";

import { LazyWrapper } from "../common/lazy-wrapper";
import { PageWrapper } from "../common/page-wrapper";
import { WithFooter } from "../components/with-footer";
import { getLayout } from "../layouts/main-layout";
import { ClassesGrid } from "../modules/home/classes-grid";
import { EmptyDashboard } from "../modules/home/empty-dashboard";
import { News } from "../modules/home/news";
import { SetGrid } from "../modules/home/set-grid";

const Home = () => {
  const { data: session, status } = useSession();
  const { data, isLoading: recentLoading } = api.recent.get.useQuery(
    undefined,
    {
      enabled: !!session?.user, // Only fetch if user is authenticated
    },
  );

  const isEmpty = !data?.entities.length;
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading" || (isAuthenticated && recentLoading);

  return (
    <>
      <HeadSeo title="Home" />
      <LazyWrapper>
        <WithFooter>
          <Container maxW="7xl">
            <Stack spacing={12}>
              {/* Show EmptyDashboard to all users if they don't have content */}
              {(!isAuthenticated || (!isLoading && isEmpty)) && (
                <EmptyDashboard />
              )}

              {/* Show user content only if authenticated and has data */}
              {isAuthenticated && !isEmpty && (
                <>
                  <SetGrid />
                  <ClassesGrid />
                </>
              )}

              {/* Show news to all users */}
              <News />
            </Stack>
          </Container>
        </WithFooter>
      </LazyWrapper>
    </>
  );
};

Home.PageWrapper = PageWrapper;
Home.getLayout = getLayout;

export default Home;
