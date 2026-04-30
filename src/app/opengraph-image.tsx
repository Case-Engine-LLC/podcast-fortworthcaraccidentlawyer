import { ImageResponse } from 'next/og'
import { attorney, authorProfiles, contact, siteConfig, stats } from '@/data/siteData'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const hostProfile = Object.values(authorProfiles)[0]
const HOST_NAME = hostProfile?.name || attorney.name
const HOST_TITLE = hostProfile?.title || attorney.title
const FIRM_NAME = attorney.firm

export const alt = `${siteConfig.podcastName} — hosted by ${HOST_NAME}, ${HOST_TITLE} at ${FIRM_NAME}`

function podcastDomain(): string {
  const url = siteConfig.podcastUrl || contact.website || ''
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export default function OgImage() {
  // Wolf has working stats (4.9★ / 200 reviews / $100M+ recovered) per siteData
  const ratingValue = stats?.rating
  const reviewCount = stats?.reviewCount
  const showStatsRow = !!(ratingValue && reviewCount)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0E0E0E',
          color: '#ffffff',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            background:
              'radial-gradient(circle at 70% 30%, rgba(255,206,9,0.32) 0%, rgba(14,14,14,0) 60%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 56,
          }}
        >
          <div
            style={{
              width: 48,
              height: 2,
              background: '#FFCE09',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#FFCE09',
              fontWeight: 600,
              display: 'flex',
            }}
          >
            {FIRM_NAME}
          </div>
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 28,
          }}
        >
          <div style={{ display: 'flex' }}>{HOST_NAME}</div>
        </div>

        <div
          style={{
            fontSize: 30,
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.35,
            maxWidth: 980,
            display: 'flex',
            marginBottom: 48,
          }}
        >
          {HOST_TITLE} · 30+ years of Texas personal injury & wrongful death trial work serving Fort Worth, the Mid-Cities, and Houston.
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 64,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.18)',
            fontSize: 22,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          {showStatsRow ? (
            <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
              <span style={{ display: 'flex' }}>
                {ratingValue}/5 across {reviewCount}+ reviews
              </span>
              <span style={{ display: 'flex', color: '#FFCE09' }}>·</span>
              <span style={{ display: 'flex' }}>$100M+ recovered for clients</span>
              <span style={{ display: 'flex', color: '#FFCE09' }}>·</span>
              <span style={{ display: 'flex' }}>Fort Worth · Houston</span>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
              <span style={{ display: 'flex' }}>Fort Worth, Texas</span>
              <span style={{ display: 'flex', color: '#FFCE09' }}>·</span>
              <span style={{ display: 'flex' }}>Personal injury & wrongful death</span>
              <span style={{ display: 'flex', color: '#FFCE09' }}>·</span>
              <span style={{ display: 'flex' }}>Weekly podcast</span>
            </div>
          )}
          <div style={{ display: 'flex', color: '#FFCE09', fontWeight: 600 }}>
            {podcastDomain()}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
