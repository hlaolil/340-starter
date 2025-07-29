const getNav = async () => {
  return [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' }
  ];
};
module.exports = { getNav };