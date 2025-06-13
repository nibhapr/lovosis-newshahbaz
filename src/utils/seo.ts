import { Metadata } from 'next';

// ✅ Fully Optimized Metadata
export const defaultMetadata: Metadata = {
    metadataBase: new URL('https://lovosis.in'),
    title: {
        default: 'Lovosis Technologies Pvt Ltd',
        template: '%s | Lovosis Technologies',
    },
    description:
        'Lovosis Technologies - A leading provider of educational equipment, testing instruments, and digital solutions in India.',
    keywords: [
        'Lovosis Technologies',
        'educational equipment',
        'testing instruments',
        'digital solutions',
        'Bengaluru tech company',
        'STEM labs India',
        'technology training tools',
        'educational technology',
        'lab equipment India',
        'science lab solutions',
        'engineering lab equipment',
        'educational tools manufacturer',
        'technical training equipment',
        'laboratory instruments',
    ],
    authors: [{ name: 'Lovosis Technologies Pvt Ltd' }],
    creator: 'Lovosis Technologies Pvt Ltd',
    publisher: 'Lovosis Technologies Pvt Ltd',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
        other: {
            rel: 'mask-icon',
            url: '/safari-pinned-tab.svg',
            color: '#5bbad5',
        },
    },
    openGraph: {
        type: 'website',
        siteName: 'Lovosis Technologies Pvt Ltd',
        locale: 'en_US',
        url: 'https://lovosis.in',
        title: 'Lovosis Technologies Pvt Ltd',
        description:
            'Discover cutting-edge educational and testing technology with Lovosis.',
        images: [
            {
                url: '/navbarlogo/lovosis-logo.png',
                width: 1200,
                height: 630,
                alt: 'Lovosis Technologies Pvt Ltd',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@lovosis',
        creator: '@lovosis',
        title: 'Lovosis Technologies Pvt Ltd',
        description:
            'Discover cutting-edge educational and testing technology with Lovosis.',
        images: ['/navbarlogo/lovosis-logo.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://lovosis.in',
        languages: {
            'en-US': 'https://lovosis.in/',
            'hi-IN': 'https://lovosis.in/',
            'as-IN': 'https://lovosis.in/',
            'bn-IN': 'https://lovosis.in/',
            'brx-IN': 'https://lovosis.in/',
            'doi-IN': 'https://lovosis.in/',
            'gu-IN': 'https://lovosis.in/',
            'kn-IN': 'https://lovosis.in/',
            'ks-IN': 'https://lovosis.in/',
            'kok-IN': 'https://lovosis.in/',
            'mai-IN': 'https://lovosis.in/',
            'ml-IN': 'https://lovosis.in/',
            'mni-IN': 'https://lovosis.in/',
            'mr-IN': 'https://lovosis.in/',
            'ne-IN': 'https://lovosis.in/',
            'or-IN': 'https://lovosis.in/',
            'pa-IN': 'https://lovosis.in/',
            'sa-IN': 'https://lovosis.in/',
            'sat-IN': 'https://lovosis.in/',
            'sd-IN': 'https://lovosis.in/',
            'ta-IN': 'https://lovosis.in/',
            'te-IN': 'https://lovosis.in/',
            'ur-IN': 'https://lovosis.in/',
            'bo-IN': 'https://lovosis.in/',
            'dog-IN': 'https://lovosis.in/',
            'fr-IN': 'https://lovosis.in/',
            'lus-IN': 'https://lovosis.in/',
            'smn-IN': 'https://lovosis.in/',
        },
    },
    verification: {
        google: 'ZPOToOD0Hyp66fbk6aCWwplrrCr3-prDyKdRxEKr-GE',
    },
    other: {
        'google-site-verification': 'ZPOToOD0Hyp66fbk6aCWwplrrCr3-prDyKdRxEKr-GE',
    },
    generator: 'Lovosis Technologies Website',
    applicationName: 'Lovosis Technologies',
    referrer: 'origin-when-cross-origin',
    manifest: '/site.webmanifest',
};

// ✅ Organization Schema (JSON-LD)
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lovosis Technologies Pvt Ltd',
    description:
        'Leading provider of educational equipment and digital solutions',
    url: 'https://lovosis.in',
    logo: '/navbarlogo/lovosis-logo.png',
    foundingDate: '2025-01-16',
    founder: [
        { '@type': 'Person', name: 'Rasheedali Aliyarmanzil Safarali' },
        { '@type': 'Person', name: 'Samseeriali Chudchimade House' },
        { '@type': 'Person', name: 'Abdul Gafoor Abdurahiman' },
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91 7012970281',
        contactType: 'customer service',
        email: 'info@lovosis.in',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
    },
    address: {
        '@type': 'PostalAddress',
        streetAddress:
            '4-72/2, Swathi Building, 3rd Floor, Opp. Singapura Garden, 1st Main Lakshmipura Road',
        addressLocality: 'Abbigere',
        addressRegion: 'Karnataka',
        postalCode: '560090',
        addressCountry: 'IN',
    },
    sameAs: [
        'https://www.instagram.com/lovosis_technology_private_ltd',
        'https://www.threads.net/@lovosis_technology_private_ltd',
        'https://in.linkedin.com/company/lovosis-technology-private-limited',
        'https://www.youtube.com/@LovosisTechnology',
    ],
    areaServed: {
        '@type': 'Country',
        name: 'India',
        alternateName: 'IN',
    },
};

// ✅ Dynamic Content Schema (JSON-LD)
export const dynamicContentSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            item: {
                '@type': 'WebPage',
                '@id': 'https://lovosis.in/products',
                name: 'Product Categories',
                description: 'Browse our product categories',
                url: 'https://lovosis.in/products',
            },
        },
        {
            '@type': 'ListItem',
            position: 2,
            item: {
                '@type': 'CollectionPage',
                '@id': 'https://lovosis.in/products',
                name: 'Products',
                description: 'Our complete product catalog',
                url: 'https://lovosis.in/products',
            },
        },
        {
            '@type': 'ListItem',
            position: 3,
            item: {
                '@type': 'CollectionPage',
                '@id': 'https://lovosis.in/events',
                name: 'Events',
                description: 'Upcoming and past events',
                url: 'https://lovosis.in/events',
            },
        },
        {
            '@type': 'ListItem',
            position: 4,
            item: {
                '@type': 'Blog',
                '@id': 'https://lovosis.in/blog',
                name: 'Blog',
                description: 'Latest news and articles',
                url: 'https://lovosis.in/blog',
            },
        },
    ],
};

// Helper function to generate dynamic metadata
export const generateDynamicMetadata = (
    type: 'product' | 'event' | 'blog',
    data: any
): Metadata => {
    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            images: data.images && data.images.length > 0 ? data.images : ['/navbarlogo/lovosis-logo.png'],
            url: `https://lovosis.in/${type}/${data.slug}`,
        },
        alternates: {
            canonical: `https://lovosis.in/${type}/${data.slug}`,
        },
    };
};
