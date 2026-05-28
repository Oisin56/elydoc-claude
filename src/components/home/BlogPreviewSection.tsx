import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Post } from '@/lib/blog'
import { formatDate } from '@/lib/blog'

export default function BlogPreviewSection({ posts }: { posts: Post[] }) {
  return (
    <section className="relative snap-section" style={{ paddingBlock: 'var(--section-padding)', minHeight: 'var(--section-min-height)' }}>
      {/* Diagonal line pattern overlay */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.03) 4px, rgba(0,0,0,0.03) 5px)',
        }}
      />

      {/* Section header */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 lg:mb-8">
          <h2 className="font-headline text-3xl lg:text-4xl font-light tracking-tight">
            GP <em className="italic" style={{ color: 'var(--color-accent)' }}>Insights</em>
          </h2>
          <Link
            href="/blog"
            className="text-sm text-accent hover:text-accent-dark transition-colors self-start sm:self-auto"
          >
            All insights →
          </Link>
        </div>
      </div>

      {/*
        Cards container:
        - Mobile: horizontal flex scroll, 320px fixed cards, snap, hidden scrollbar
        - Desktop: standard 3-col grid inside max-w-7xl
      */}
      <style>{`
        .blog-scroll::-webkit-scrollbar { display: none; }
        /* Desktop snap: reduce image height and card padding to fit inside 100svh */
        @media (min-width: 1024px) {
          .blog-card-image { height: 160px !important; }
          .blog-card-body  { padding: 20px 24px !important; }
        }
      `}</style>
      <div
        className="relative z-10 blog-scroll flex gap-5 overflow-x-auto pl-6 lg:grid lg:grid-cols-3 lg:overflow-x-visible lg:gap-6 lg:mx-auto lg:max-w-7xl lg:px-8"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as CSSProperties}
      >
        {posts.map((post, i) => (
          <article
            key={post.slug || `placeholder-${i}`}
            className="w-[320px] flex-shrink-0 lg:w-auto group flex flex-col overflow-hidden"
            style={{
              scrollSnapAlign: 'start',
              backgroundColor: 'var(--color-background)',
              border: '0.5px solid color-mix(in oklch, var(--color-text) 10%, transparent)',
              borderRadius: '8px',
            }}
          >
            {post.imageUrl && (
              <div className="blog-card-image overflow-hidden" style={{ height: '200px', flexShrink: 0 }}>
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={600}
                  height={340}
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            )}

            <div className="blog-card-body p-7 lg:p-8 flex flex-col flex-1 space-y-5">
              <div className="space-y-1 flex-1">
                {post.category && (
                  <p
                    className="text-xs font-semibold uppercase text-accent"
                    style={{ opacity: 0.85, letterSpacing: '0.08em' }}
                  >
                    {post.category}
                  </p>
                )}
                <h3 className="font-headline text-xl font-light leading-snug pt-1">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm leading-relaxed pt-2" style={{ opacity: 0.62 }}>
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-xs" style={{ opacity: 0.42 }}>
                  {formatDate(post.publishedDate)}
                </p>
                {post.slug ? (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm text-accent hover:text-accent-dark transition-colors"
                    aria-label={`Read: ${post.title}`}
                  >
                    Read →
                  </Link>
                ) : (
                  <span className="text-xs" style={{ opacity: 0.3 }}>
                    Coming soon
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
        {/* Trailing spacer on mobile */}
        <div className="w-4 flex-shrink-0 lg:hidden" aria-hidden />
      </div>
    </section>
  )
}
