import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const task = "mow the lawn";
  const dueDate = "08/05/2002";

  fireEvent.change(inputTask, {target: {value: task}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);
  fireEvent.change(inputTask, {target: {value: task}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  const check = screen.getAllByText(/lawn/i);
  expect(check.length).toBe(1);
 });


 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const dueDate = "08/05/2002";

  fireEvent.change(inputTask, {target: {value: ""}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  const check = screen.getAllByRole("link");
  expect(check.length).toBe(2);
 });


 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const task = "mow the lawn";

  fireEvent.change(inputTask, {target: {value: task}});
  fireEvent.click(element);

  const check = screen.getAllByRole("link");
  expect(check.length).toBe(2); 
});



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const task = "mow the lawn";
  const dueDate = "08/05/2002";

  fireEvent.change(inputTask, {target: {value: task}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  const check = screen.getAllByRole("link");
  expect(check.length).toBe(3);

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  const check2 = screen.getAllByRole("link");
  expect(check2.length).toBe(2);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});

  const task = "mow the lawn";
  const dueDate = "08/05/2002";

  fireEvent.change(inputTask, {target: {value: task}});
  fireEvent.change(inputDate, {target: {value: dueDate}});
  fireEvent.click(element);

  const check = screen.getByTestId(/lawn/i).style.background;
  expect(check).toBe("red");
 });
