/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import { PostFrontMatter } from 'types/PostFrontMatter'

export default function Article({
  slug,
  date,
  title,
  summary,
  tags,
  images,
  show,
}: PostFrontMatter) {
  const src = images && images[0]
  return (
    show && (
      <li key={slug} className="py-6">
        <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-start xl:gap-10 xl:space-y-0">
          <dl className="xl:col-span-1">
            <dt className="mb-4">
              <Link
                href={`/blog/${slug}`}
                className="block overflow-hidden rounded shadow-lg"
                title={title}
              >
                <img
                  alt={title}
                  className="w-full transform object-cover duration-200 hover:scale-110"
                  src={
                    src ||
                    'https://source.unsplash.com/random/224x128/?film,2K' ||
                    'https://placeimg.com/224/128/nature'
                  }
                />
              </Link>
            </dt>
            <dd className="sr-only">发布时间</dd>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </dl>
          <div className="space-y-4 xl:col-span-3">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                    {title}
                  </Link>
                </h3>
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
            </div>
            <div className="text-base font-medium leading-7">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read "${title}"`}
              >
                阅读更多 &rarr;
              </Link>
            </div>
          </div>
        </article>
      </li>
    )
  )
}
