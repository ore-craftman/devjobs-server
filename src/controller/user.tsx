interface UserInterface {
  firstname: string;
  lastname: string;
  email: string;
  keyMaster: string;
  companyName: string;
  companyUrl: string;
}

const createUser = ({
  firstname,
  lastname,
  email,
  keyMaster,
  companyName,
  companyUrl,
}: UserInterface) => {
  console.log({
    firstname,
    lastname,
    email,
    keyMaster,
    companyName,
    companyUrl,
  });
};

module.exports = { createUser };
