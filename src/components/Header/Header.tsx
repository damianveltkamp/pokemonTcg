export const Header = () => {
  const navItems = [
    {
      slug: "/",
      label: "Homepage",
    },
    {
      slug: "/quiz",
      label: "Who's that pokemon",
    },
  ];

  return (
    <header>
      <nav>
        <ul className="flex gap-2">
          {navItems.map(({ slug, label }) => (
            <li key={label} className="text-2xl">
              <a href={slug}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
