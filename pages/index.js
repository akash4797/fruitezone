import Head from "next/head";
import React, { useEffect } from "react";
import { NextAuthStore, pocketClient } from "../lib/pocketbase";
import Layout from "../components/Layout/Layout";
import { productFetch } from "../swr-fetcher/fetchers";
import useSWR from "swr";
import ProductCard from "../components/productCard/ProductCard";

export default function Home({ user }) {
  const { data, error } = useSWR("product", productFetch, { suspense: true });
  if (error) return <div className="">An error occured</div>;
  if (!data) return <div className="">Loading</div>;
  return (
    <div>
      <Head>
        <title>Fruitezone</title>
        <meta name="description" content="Online Blood Bank" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout user={user}>
          <div className="flex justify-center">
            <div className="container">
              <div className="py-4">
                <h1 className="text-3xl font-semibold underline underline-offset-8">
                  Products
                </h1>
                <div className="mt-5 flex flex-wrap gap-5">
                  {data.map((item) => {
                    return <ProductCard key={item.id} item={item} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </main>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  pocketClient.authStore = new NextAuthStore(req, res);

  if (!pocketClient.authStore.isValid) {
    return {
      redirect: {
        parmanent: false,
        destination: "/login",
      },
    };
  }

  let user;
  try {
    const reqUser = await pocketClient.users.getOne(
      // @ts-ignore
      pocketClient.authStore.model?.id
    );
    user = JSON.parse(JSON.stringify(reqUser));
    if (user.profile.admin) throw new Error("Not Authorized");
    if (!user.profile.profileupdated) {
      return {
        redirect: {
          parmanent: false,
          destination: "/updateprofile",
        },
      };
    }
  } catch (error) {
    return {
      redirect: {
        parmanent: false,
        destination: "/login",
      },
    };
  }

  await pocketClient.users.refresh();
  return {
    props: {
      user,
    },
  };
}
