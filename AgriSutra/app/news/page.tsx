"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchNews } from '../../lib/news';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const newsData = await fetchNews();
      if (newsData) {
        setArticles(newsData);
      }
      setLoading(false);
    };

    getNews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Clickable back arrow with new style */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft size={28} className="text-blue-900" />
        </button>
        <h1 className="text-2xl font-semibold ml-3">Latest News</h1>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading news..</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => {
            const imageUrl = article.image || '/news.jpg';
            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Image
                  src={imageUrl}
                  alt={article.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  <p className="text-gray-600 text-sm mt-2">{article.source}</p>
                  <p className="text-gray-700 mt-3">{article.description}</p>
                  <Link
                    href={article.url}
                    target="_blank"
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
