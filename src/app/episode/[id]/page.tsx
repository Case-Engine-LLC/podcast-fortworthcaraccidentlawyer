import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import V1EpisodePage from '@/themes/v1/pages/V1EpisodePage'
import { getAllEpisodes, getEpisodeByIdOrSlug, getEpisodeTranscript } from '@/lib/data'
import { siteConfig } from '@/data/siteData'

export const revalidate = 3600

export async function generateStaticParams() {
  try {
    const episodes = await getAllEpisodes()
    return episodes.map(ep => ({ id: ep.slug ?? String(ep.id) }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const episode = await getEpisodeByIdOrSlug(id)
  const siteHost = (siteConfig.podcastUrl || '').replace(/\/$/, '')

  if (!episode) {
    const fallbackPath = `/episode/${id}`
    return {
      title: 'Episode Not Found',
      alternates: { canonical: fallbackPath },
      openGraph: {
        url: `${siteHost}${fallbackPath}`,
      },
    }
  }

  const canonicalPath = `/episode/${episode.slug ?? episode.id}`
  return {
    title: episode.title,
    description: episode.description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: episode.title,
      description: episode.description,
      url: `${siteHost}${canonicalPath}`,
      type: 'article',
    },
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const allEpisodes = await getAllEpisodes()
  const episode = await getEpisodeByIdOrSlug(id)
  if (!episode) notFound()

  const transcript = await getEpisodeTranscript(episode)

  return (
    <V1EpisodePage
      episodeId={id}
      episode={episode}
      allEpisodes={allEpisodes}
      transcript={transcript}
    />
  )
}
