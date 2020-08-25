import Head from "next/head";
import Layout from "./Layout";
import React, { useState } from "react";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="containerFluid">
      <Head>
        <title>Libero</title>
        <link rel="icon" href="/icons/logo.ico" />
      </Head>
      <div>
        <Layout></Layout>
      </div>
    </div>
  );
}
