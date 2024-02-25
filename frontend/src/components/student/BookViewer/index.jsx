
function BookViewer({ book }) {

  if (book?.number == 1) {
    return (
      <div className="w-scren h-[calc(100vh-80px)]">
        <embed className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
          src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF162P9V7c&#x2F;view?embed" />
      </div>
    )
  }

  if (book?.number == 2) {
    return (
      <div className="w-scren h-[calc(100vh-80px)]">
        <embed className="pointer-events-auto" loading="lazy" width={"100%"} height={"100%"} allowFullScreen
          src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAF0bWvicRQ&#x2F;view?embed" />
      </div>
    )
  }

  if (book?.number == 3) {
    //
  }

  if (book?.number == 4) {
    //
  }

  if (book?.number == 5) {
    //
  }

}

export default BookViewer;