import { useTranslation } from 'react-i18next'
import { Header } from 'semantic-ui-react'

export default function About () {
  const { t } = useTranslation()

  return <>
    <Header>
      {t('titles.about')}
    </Header>
    <div>
      {t('texts.about')}
    </div>
  </>
}