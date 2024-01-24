import Link from 'next/link'
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useRouter } from 'next/router'

type Props = {
  // Add custom props here
}

const SecondPage = (
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { push } = useRouter()
  const { t } = useTranslation(['common', 'third-page'])

  return (
    <>
      <main>
        <Header
          heading={t('third-page:h1')}
          title={t('third-page:title')}
        />
        <Link href="/">
          <button type="button">
            {t('third-page:back-to-home')}
          </button>
        </Link>
          <button type="button" onClick={() => {
            push('/second-page')
          }}>
            {t('third-page:go-to-second-page')}
          </button>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'third-page',
      'footer',
    ])),
  },
})

export default SecondPage
