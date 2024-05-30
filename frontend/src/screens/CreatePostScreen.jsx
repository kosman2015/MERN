import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import { useCreateMutation } from "../slices/postsApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreatePostScreen() {
  const [create, { isLoading }] = useCreateMutation();
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const post = await create({
        title: e.target.title.value,
        body: e.target.body.value,
      });

      navigate("/posts");
      toast.success("Post created successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Create a New Post</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            required={true}
            onChange={(e) => e.target.value}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={9}
            placeholder="Enter Body"
            required={true}
            onChange={(e) => e.target.value}
          ></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <Button type="submit" variant="primary" className="mt-3">
          Create Post
        </Button>
      </Form>
    </FormContainer>
  );
}

export default CreatePostScreen;
