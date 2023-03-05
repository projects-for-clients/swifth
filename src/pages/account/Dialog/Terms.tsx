function Terms({ closeDialog }: { closeDialog: () => void }) {
  return (
    <div className="">
      <>
        <p className="text-[2rem] mb-16">Terms & Conditions</p>

        <div className="grid gap-8 mt-[5rem]">
          <p className="bg-[#E9E6F1] text-[#251A45] p-4 text-center">
            New update - 1st November 2022
          </p>

          <div>
            <p className="text-[2.4rem] mb-4">
              These are the Terms and Conditions for using your Swifth account
            </p>
            <p className="text-justify">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?" Donec hendrerit nisi justo, eu
              scelerisque nibh semper quis. Nam eu nisi risus. Quisque
              vestibulum consequat sollicitudin. Proin rutrum luctus tellus, sed
              sollicitudin libero suscipit id. Praesent sagittis lacus
              scelerisque malesuada facilisis. Cras commodo nibh ex, id molestie
              nulla ornare a. In bibendum, sem et egestas luctus, urna purus
              pulvinar lectus, quis viverra tellus nulla nec tortor. Nunc at
              semper enim, ut imperdiet mauris. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </>
    </div>
  );
}

export default Terms;
