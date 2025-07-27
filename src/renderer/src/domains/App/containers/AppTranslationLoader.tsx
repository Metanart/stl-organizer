import { FC, Fragment, PropsWithChildren, useEffect, useState } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { Namespaces } from '@i18n/i18n-types.generated'
import { loadNamespaceAsync } from '@i18n/i18n-util.generated.async'

import { Loader } from '../../Common/components/Generic/Loader/Loader'

type Props = { namespace: Namespaces } & PropsWithChildren

export const AppTranslationLoader: FC<Props> = ({ namespace, children }) => {
  const { locale, setLocale } = useI18nContext()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    loadNamespaceAsync(locale, namespace)
      .then(() => setLocale(locale))
      .then(() => setLoaded(true))
  }, [locale, namespace, setLocale])

  if (!loaded) return <Loader message="Loading translations…" />

  return <Fragment>{children}</Fragment>
}
