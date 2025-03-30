import axios from 'axios';

export const userSignup = async (user) => {
  try {
    console.log(user);
    const response = await axios.post('/api/v1/user/signup', user, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const userSignin = async (user) => {
    try {
        const response = await axios.post('/api/v1/user/signin', user, {
          headers : {
            'Content-Type': 'application/json',
          }
      });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.put('/api/v1/user', user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getUsers = async (filter) => {
  try {
    const response = await axios.get(`/api/v1/user/bulk?filter=${filter}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}