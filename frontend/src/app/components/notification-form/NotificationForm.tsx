import { FC, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { Category, Notification } from "../../interfaces";

interface Props {
  onNotiy?(notification: Notification): Promise<void>;
  categories?: Category[];
}

export const NotificationForm: FC<Props> = ({ onNotiy, categories = [] }) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @ts-ignore
    const { categoryCode, content } = event.target;
    onNotiy?.({
      content: content?.value,
      categoryCode: categoryCode?.value,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="categoryCode">
        <Form.Label>Categoría</Form.Label>
        <Form.Select aria-label="Selector de categorias">
          {categories?.map(({ code, name }) => (
            <option key={`category-${code}`} value={code}>
              {name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="content">
        <Form.Label>Mensaje</Form.Label>
        <Form.Control as="textarea" rows={4} maxLength={255} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar Mensaje
      </Button>
    </Form>
  );
};
