import { FC, Fragment, PropsWithChildren, useEffect } from 'react'
import { useI18nContext } from '@i18n/i18n-react.generated'
import { Namespaces } from '@i18n/i18n-types.generated'
import { loadNamespaceAsync } from '@i18n/i18n-util.generated.async'

type Props = { namespace: Namespaces } & PropsWithChildren

export const AppTranslationLoader: FC<Props> = ({ namespace, children }) => {
  const { locale, setLocale } = useI18nContext()

  useEffect(() => {
    loadNamespaceAsync(locale, namespace).then(() => setLocale(locale))
  }, [locale, namespace, setLocale])

  return <Fragment>{children}</Fragment>
}
