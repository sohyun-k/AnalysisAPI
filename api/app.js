const { create } = require("./datasource/mory/create.js");

exports.lambdaHandler = async (event, context) => {
  try {
    const createInput = event.arguments;

    await create(
      "id-3",
      "name",
      "nickname",
      130.24242424,
      130.242424525,
      "favorite_type",
      new Date()
    );

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "hello world",
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
