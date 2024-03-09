import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function BookViewer({ book, lesson = 1 }) {

  const [_, setSearchParams] = useSearchParams()

  useEffect(() => {
    switch (book?.number) {
      case 1:
        setSearchParams(state => {
          state.set('q', 32)
          return state
        })
        break;
      case 2:
        setSearchParams(state => {
          state.set('q', 32)
          return state
        })
        break;
    }
  }, [book?.number, setSearchParams])

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
              src="" />
          </div>
        )
      case 7:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 8:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 9:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 10:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 11:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 12:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 13:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 14:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 15:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 16:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 17:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 18:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 19:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 20:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )

      case 21:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 22:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 23:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 24:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 25:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 26:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 27:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 28:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 29:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 30:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 31:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
      case 32:
        return (
          <div className="w-scren h-[calc(100vh-80px)]">
            <iframe className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
              src="" />
          </div>
        )
    }
  }
}

export default BookViewer;