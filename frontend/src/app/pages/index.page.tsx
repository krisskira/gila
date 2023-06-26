import { FC, useEffect } from "react";
import { NotificationForm } from "../components/notification-form/NotificationForm";
import { LogTable } from "../components/log-table/LogTable";
import { useCategoryService } from "../hooks/useCategory";
import { Notification } from "../interfaces";
import { Alert, Card, Container } from "react-bootstrap";
import { useNotificationService } from "../hooks/useNotification";
import { useMessagesLogService } from "../hooks/useMessagesLog";

export const IndexPage: FC = () => {
  const [categories, getCategories] = useCategoryService();
  const [messagesLog, getMessagesLog, messagesLogOptions] =
    useMessagesLogService();
  const [,postNotification, notifyServiceOptions] = useNotificationService();

  useEffect(() => {
    getCategories();
    getMessagesLog();
  }, []);

  const sendNotification = async (notification: Notification) => {
    await postNotification({
      ...notification,
    });
    await getMessagesLog();
    notifyServiceOptions.reset?.();
  };

  return (
    <>
      <Container fluid className="p-2 col-6">
        <Card>
          <Card.Body>
            <Card.Title>Gila Notifications App</Card.Title>
            <Card>
              <Card.Body>
                <NotificationForm
                  onNotiy={sendNotification}
                  categories={categories}
                />
              </Card.Body>
              {!!notifyServiceOptions.error && (
                <Alert
                  variant="danger"
                  onClose={notifyServiceOptions.reset}
                  dismissible
                >
                  <Alert.Heading>Ups!</Alert.Heading>
                  <p>{notifyServiceOptions.error}</p>
                </Alert>
              )}
            </Card>
            <Card.Link href={import.meta.env.VITE_SERVER_URL + "docs"}>
              See the API Doc for more information
            </Card.Link>
          </Card.Body>
        </Card>
      </Container>
      {!messagesLogOptions.loading && messagesLog && (
        <LogTable messagesLogs={messagesLog} />
      )}
    </>
  );
};
