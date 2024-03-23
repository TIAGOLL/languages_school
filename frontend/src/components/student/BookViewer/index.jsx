import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function BookViewer({ book, lesson = 1 }) {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams(state => {
      state.set('ql', 32)
      return state
    })
    setSearchParams(state => {
      state.set('qw', 4)
      return state
    })
  }, [setSearchParams])

  if (book?.number == 1) {
    switch (lesson) {
      case 1:
        return (
          <div className="w-full h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-AQFw9PY&#x2F;F7rGGz9nm-FU6MQqUuHEBA&#x2F;view?embed" />
          </div>
        )
      case 2:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-Aa0gSXs&#x2F;ktuLo1qGGDODvwiC9A83Gg&#x2F;view?embed" />
          </div>
        )
      case 3:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-AWQM8bE&#x2F;tXghylX9lCUrUFMKCM4ohw&#x2F;view?embed" />
          </div>
        )
      case 4:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-AXh9YgM&#x2F;FeP5wyVhHBGYR1gZZzan9g&#x2F;view?embed" />
          </div>
        )
      case 5:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-ARO8vBw&#x2F;m-Dx7rBW_dN9kFu_PZYniw&#x2F;view?embed" />
          </div>
        )
      case 6:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-Acqdqgc&#x2F;9et722bmgxLfg3US4gNpSA&#x2F;view?embed" />
          </div>
        )
      case 7:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-ARA-J1I&#x2F;ihWFx06dVXECO9PgFb5zkw&#x2F;view?embed" />
          </div>
        )
      case 8:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-Az59JlA&#x2F;eN24xH8QLIzK21u46uN3-Q&#x2F;view?embed" />
          </div>
        )
      case 9:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-A6GLMAo&#x2F;Fy-EgHn5Mj_n-hMQvRfJkw&#x2F;view?embed" />
          </div>
        )
      case 10:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-A0bwXRc&#x2F;fESDKstFyvKgA_-TO-nI9w&#x2F;view?embed" />
          </div>
        )
      case 11:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-A4gBPiA&#x2F;O2I7eIK6lqQdj35fw5cg1g&#x2F;view?embed" />
          </div>
        )
      case 12:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-A0bD5Fo&#x2F;V6k8bbll8v39DnMci5nMGQ&#x2F;view?embed" />
          </div>
        )
      case 13:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-CP8MFAg&#x2F;esYhv8GON93u2nbhY_5gMQ&#x2F;view?embed" />
          </div>
        )
      case 14:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-CHyv_fk&#x2F;dxp1Z0f2ePhMTNEwZavNcQ&#x2F;view?embed" />
          </div>
        )
      case 15:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-GiaPiM8&#x2F;_MKc7XHVS7f9SbDaEqO92w&#x2F;view?embed" />
          </div>
        )
      case 16:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-GigAth8&#x2F;gYZG4NwKI4XaggALfhBoKQ&#x2F;view?embed" />
          </div>
        )
      case 17:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-Gsipye0&#x2F;5gZ4LwYoLOBMhMp3Hz_RwQ&#x2F;view?embed" />
          </div>
        )
      case 18:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-Gu6f6dQ&#x2F;R_adn4vlpsTEhV-1ujsIOw&#x2F;view?embed" />
          </div>
        )
      case 19:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-Gzvi-yQ&#x2F;V343u59-PN44CC4UNDvoxQ&#x2F;view?embed" />
          </div>
        )
      case 20:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-MjOcnXY&#x2F;mciXEPe-oG4u2aMX1RUSkw&#x2F;view?embed" />
          </div>
        )

      case 21:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-M0CY6L4&#x2F;K7K8-UJz5GoP5-uBPJcaww&#x2F;view?embed" />
          </div>
        )
      case 22:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-M_AczJ0&#x2F;rGpYpQ0V0-fQxzyvYgkDjQ&#x2F;view?embed" />
          </div>
        )
      case 23:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-Sd6AkDs&#x2F;1yHNnkGfwZSfXWm3unPv5A&#x2F;view?embed" />
          </div>
        )
      case 24:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-SropKEY&#x2F;rsbccBUKg1AQ92RGRrw1jg&#x2F;view?embed" />
          </div>
        )
      case 25:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-leoWUx0&#x2F;Di1aEAnyb-5TpbW94jEyug&#x2F;view?embed" />
          </div>
        )
      case 26:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-lQM-Uxo&#x2F;jHtrs8aIfI8INqRffXNBtQ&#x2F;view?embed" />
          </div>
        )
      case 27:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-lVDvJUI&#x2F;8aXzntPJJtS00EXdRueRcw&#x2F;view?embed" />
          </div>
        )
      case 28:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-qjn-OSs&#x2F;fwSswb1DTIFqXWNArFKpCA&#x2F;view?embed" />
          </div>
        )
      case 29:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-qigprZs&#x2F;U369-mNk_IB_sETWvLSg-w&#x2F;view?embed" />
          </div>
        )
      case 30:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-qi4Odjk&#x2F;7jdIOIxz1JvUKC3fUD22YA&#x2F;view?embed" />
          </div>
        )
      case 31:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-qtoF6aU&#x2F;cC7-wmU_OzZjvMOqm3KKTQ&#x2F;view?embed" />
          </div>
        )
      case 32:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-qtq1ICY&#x2F;UtR0K2hDMCEAcnzCdCXpZg&#x2F;view?embed" />
          </div>
        )
      case 33:
        // WAK 1
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-AagXu9A&#x2F;HBRTmIUqSDVXtm6_2vrjSQ&#x2F;view?embed" />
          </div>
        )
      case 34:
        // WAK 2
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-CH9pHAQ&#x2F;hmcGmyD32NObDwzzE2sllQ&#x2F;view?embed" />
          </div>
        )
      case 35:
        // WAK 3
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-MlO6frM&#x2F;_s38JVkceghO953PH-2KMw&#x2F;view?embed" />
          </div>
        )
      case 36:
        // WAK 4
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-qiB_13Q&#x2F;CzsholtP-bx9SIngbhuojQ&#x2F;view?embed" />
          </div>
        )


    }
  }

  if (book?.number == 2) {
    switch (lesson) {
      case 1:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-rG50hHU&#x2F;Nry9j9jjWercxmWNcKNhfg&#x2F;view?embed" />

          </div>
        )
      case 2:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-rK2hkjg&#x2F;YBdYMgYxDU0qV3KORg4uGw&#x2F;view?embed" />
          </div>
        )
      case 3:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-ropWhvY&#x2F;6OehKSQ9PIGs0-Opo1IwCA&#x2F;view?embed" />
          </div>
        )
      case 4:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-rr6OKrI&#x2F;WvgExBDyCL8DtQyW606WHw&#x2F;view?embed" />
          </div>
        )
      case 5:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-ruZSqDc&#x2F;e94Wa17BOmyKaN1ncUQljQ&#x2F;view?embed" />
          </div>
        )
      case 6:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_UWKYm5A&#x2F;_Fjb20WmyL5kBUasdxYufw&#x2F;view?embed" />
          </div>
        )
      case 7:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_Uuf5s1k&#x2F;0hfQl3bXr7swsSjXpKJWQw&#x2F;view?embed" />
          </div>
        )
      case 8:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_Uufr3BQ&#x2F;fQAz5EK8kLS-26xYJPJ0UQ&#x2F;view?embed" />
          </div>
        )
      case 9:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_UrLz9j0&#x2F;Ny606OaYeNMCvJCh4HT-IA&#x2F;view?embed" />
          </div>
        )
      case 10:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_UjYJf0g&#x2F;iCNgje3u41HffrU-0TPG3Q&#x2F;view?embed" />
          </div>
        )
      case 11:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_U7Bx9lk&#x2F;Q5xqCLLpnC0bKG0XbaoxOg&#x2F;view?embed" />
          </div>
        )
      case 12:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_U3-Zo30&#x2F;gdbP3bVXWWIwTjtzp7dBzg&#x2F;view?embed" />
          </div>
        )
      case 13:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_a8wZXFA&#x2F;KHn5FQjp1l1OfQ_QLE0CRQ&#x2F;view?embed" />
          </div>
        )
      case 14:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_a2u0H8k&#x2F;ubFGVEjGSA9H2Wp4RMnBBg&#x2F;view?embed" />
          </div>
        )
      case 15:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_bfvDH20&#x2F;IP7SwDJGgxM3B-CzQNbD6w&#x2F;view?embed" />
          </div>
        )
      case 16:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_bRzPRtc&#x2F;r9yryQnG1SLAkbrPDMejUg&#x2F;view?embed" />
          </div>
        )
      case 17:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_bR-kBR8&#x2F;pfxS4_O-C5XJiXd3MTjjYw&#x2F;view?embed" />
          </div>
        )
      case 18:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_bkHIJWU&#x2F;1-ey4r55LouezYSa9fcppw&#x2F;view?embed" />
          </div>
        )
      case 19:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_bqnZ-Jw&#x2F;8N-IBJtVR2QdfyJjbmhkSw&#x2F;view?embed" />
          </div>
        )
      case 20:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_gcCxmKU&#x2F;IExk7a8GG_BhYsjBlBD8yg&#x2F;view?embed" />
          </div>
        )

      case 21:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_gngLHms&#x2F;XhD1EOtvN6rBiGnYEAkiMg&#x2F;view?embed" />
          </div>
        )
      case 22:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_grYLxZM&#x2F;VgQrdZerK_mntDVuSnGLcA&#x2F;view?embed" />
          </div>
        )
      case 23:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_glcSvmA&#x2F;zILREOTE1VuhQgexWaZd3g&#x2F;view?embed" />
          </div>
        )
      case 24:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_gtR5vpE&#x2F;anQcYAL1S28OLtzQM1DMTg&#x2F;view?embed" />
          </div>
        )
      case 25:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_4ozbweM&#x2F;fFkkaXV1neO5ED0UiSiwlg&#x2F;view?embed" />
          </div>
        )
      case 26:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_4vxL8zo&#x2F;YjRT-IKw0_mDN3n50rLnNw&#x2F;view?embed" />
          </div>
        )
      case 27:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_4vsaIjo&#x2F;UQ9tHQx_oXhKWO9aW98rdQ&#x2F;view?embed" />
          </div>
        )
      case 28:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_4tmi7Tg&#x2F;MaKSVp-wjnzAjrwMEfXUBw&#x2F;view?embed" />
          </div>
        )
      case 29:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_41PdFfw&#x2F;hxT1PBTE2HuCOVmYfvtQwQ&#x2F;view?embed" />
          </div>
        )
      case 30:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_4lCyLhA&#x2F;hhAk6RvkFm_4ogJcOQyVtg&#x2F;view?embed" />
          </div>
        )
      case 31:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_40s4zdQ&#x2F;BYlGk9tVTnIWtHbt-1gWrQ&#x2F;view?embed" />
          </div>
        )
      case 32:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_45N2-Vk&#x2F;iysr8nFthQTA8Y62ifmSBg&#x2F;view?embed" />
          </div>
        )
      case 33:
        // WAK 1
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF-rrgyuQs&#x2F;9XPfm8NuZ-FfMimSzmVzBw&#x2F;view?embed" />
          </div>
        )
      case 34:
        // WAK 2
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_U-zPi70&#x2F;WEUMixSEgfwsRTtfEsA32w&#x2F;view?embed" />
          </div>
        )
      case 35:
        // WAK 3
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_gf0Mj_Q&#x2F;IbdYSi2QojDDPWGii6IA2g&#x2F;view?embed" />
          </div>
        )
      case 36:
        // WAK 4
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF_4nEoBbI&#x2F;nQYs6b55wgfRlBSeMUmJrQ&#x2F;view?embed" />
          </div>
        )

    }
  }
}

export default BookViewer;