import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createRental } from 'apiSdk/rentals';
import { Error } from 'components/error';
import { rentalValidationSchema } from 'validationSchema/rentals';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CustomerInterface } from 'interfaces/customer';
import { InventoryInterface } from 'interfaces/inventory';
import { getCustomers } from 'apiSdk/customers';
import { getInventories } from 'apiSdk/inventories';
import { RentalInterface } from 'interfaces/rental';

function RentalCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RentalInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRental(values);
      resetForm();
      router.push('/rentals');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RentalInterface>({
    initialValues: {
      rental_date: new Date(new Date().toDateString()),
      return_date: new Date(new Date().toDateString()),
      customer_id: (router.query.customer_id as string) ?? null,
      inventory_id: (router.query.inventory_id as string) ?? null,
    },
    validationSchema: rentalValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Rental
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="rental_date" mb="4">
            <FormLabel>Rental Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.rental_date ? new Date(formik.values?.rental_date) : null}
                onChange={(value: Date) => formik.setFieldValue('rental_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <FormControl id="return_date" mb="4">
            <FormLabel>Return Date</FormLabel>
            <Box display="flex" maxWidth="100px" alignItems="center">
              <DatePicker
                dateFormat={'dd/MM/yyyy'}
                selected={formik.values?.return_date ? new Date(formik.values?.return_date) : null}
                onChange={(value: Date) => formik.setFieldValue('return_date', value)}
              />
              <Box zIndex={2}>
                <FiEdit3 />
              </Box>
            </Box>
          </FormControl>
          <AsyncSelect<CustomerInterface>
            formik={formik}
            name={'customer_id'}
            label={'Select Customer'}
            placeholder={'Select Customer'}
            fetcher={getCustomers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <AsyncSelect<InventoryInterface>
            formik={formik}
            name={'inventory_id'}
            label={'Select Inventory'}
            placeholder={'Select Inventory'}
            fetcher={getInventories}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.tool_name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'rental',
    operation: AccessOperationEnum.CREATE,
  }),
)(RentalCreatePage);
