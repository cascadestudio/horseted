export async function generateMetadata() {
  return {
    title: `À propos | Application Horseted`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec.`,
  };
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">À propos de nous</h1>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
      <p className="mb-4">
        Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
        Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at
        dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel
        nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis,
        luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris
        ipsum.
      </p>
      <p className="mb-4">
        Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh.
        Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Nam nec
        ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing
        diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla.
        Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet.
      </p>
    </div>
  );
}
