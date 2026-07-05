import { Helmet } from 'react-helmet-async';
import { projects } from './data/projects';
import Projectcard from './components/projectcard';

export default function page() {
  const sortedprojects = [...projects].sort((a, b) => b.year - a.year);

  return (
    <>
      <Helmet>
        <title>Hussain Ahmad | Selected Works</title>
        <meta name="description" content="Portfolio of Hussain Ahmad featuring selected filmmaking and multimedia projects." />
      </Helmet>
      <div className="flex flex-col divide-y divide-zinc-900">
        {sortedprojects.map((proj, index) => (
          <div key={index} className="py-24 first:pt-0 last:pb-0">
            <Projectcard data={proj} />
          </div>
        ))}
      </div>
    </>
  );
}
