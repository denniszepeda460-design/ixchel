import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetailView from "@/components/product/ProductDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    ...products.map((product) => ({
      slug: product.slug,
    })),
    { slug: "maceta-pata-de-gato" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Maceta no encontrada — Ixchel",
    };
  }

  return {
    title: `${product.name} — Macetas Artesanales Ixchel`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — Macetas Artesanales Ixchel`,
      description: product.shortDescription,
      images: [
        {
          url: product.images[0],
          width: 1000,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
