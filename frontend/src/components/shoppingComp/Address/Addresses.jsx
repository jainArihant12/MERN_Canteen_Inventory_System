import React, { useEffect, useState } from 'react';
import { CardHeader, Card, CardTitle, CardContent } from '../../ui/card';
import CommonForm from '../../common/form';
import { formControlsShopAddress } from '@/config';
import AddressCards from './AddressCards';
import { useDispatch, useSelector } from 'react-redux';
import {
  addAddress,
  deleteAddress,
  fetchAddress,
  updateAddress
} from '@/Slices/shop/address-slice';
import { toast } from 'sonner';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const Addresses = () => {
  const initialState = {
    address: '',
    city: '',
    pincode: '',
    phone: 0,
    notes: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [getCurrentEditId, setCurrentEditId] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAddress(user.id));

    const savedAddressId = localStorage.getItem('selectedAddressId');
    if (savedAddressId) {
      setSelectedAddressId(savedAddressId);
    }
  }, [dispatch, user.id]);

  const handleSubmitAddress = (event) => {
    event.preventDefault();

    // Prevent adding more than 2 addresses
    if (addressList.length >= 2 && getCurrentEditId === null) {
      toast.error('Only 2 Address Allowed');
      setFormData(initialState);
      return;
    }

    // ADD Address
    if (getCurrentEditId === null) {
      dispatch(
        addAddress({
          ...formData,
          userId: user?.id
        })
      ).then((data) => {
        if (data?.payload?.success) {
          toast.success(data?.payload?.message);
          dispatch(fetchAddress(user.id));
          setFormData(initialState);
        }
      });
    }
    // EDIT Address
    else if (getCurrentEditId && getCurrentEditId._id) {
      dispatch(
        updateAddress({
          userId: user.id,
          addressId: getCurrentEditId._id,
          addressList: formData
        })
      ).then((data) => {
        if (data?.payload?.success) {
          setCurrentEditId(null);
          setFormData(initialState);
          toast.success(data?.payload?.message);
          dispatch(fetchAddress(user.id));
        }
      });
    }
    // Fallback safety (optional)
    else {
      toast.error('Unexpected error while updating address');
    }
  };

  const handleDelete = (addressId) => {
    dispatch(deleteAddress({ userId: user.id, addressId })).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);
      }
    });
  };

  const handleEdit = (CurrentaddressId) => {
    setCurrentEditId(CurrentaddressId);
    setFormData({
      address: CurrentaddressId.address || '',
      city: CurrentaddressId.city || '',
      pincode: CurrentaddressId.pincode || '',
      phone: CurrentaddressId.phone || 0,
      notes: CurrentaddressId.notes || ''
    });
  };

  const isValidForm = () => {
    return Object.values(formData).every(
      (value) => value !== null && value !== '' && value !== undefined
    );
  };

  const handleSelectedAddressId = (id) => {
    localStorage.setItem('selectedAddressId', id);
    setSelectedAddressId(id);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-8">
      {/* Title */}
      <div className="text-lg font-semibold text-black text-center sm:text-left">
        Address List
      </div>

      {/* Select Delivery Address */}
      <div className="max-w-md mx-auto sm:mx-0 space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Select Delivery Address</h2>

        <Select value={selectedAddressId} onValueChange={handleSelectedAddressId}>
          <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <SelectValue placeholder="Choose a delivery address" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg">
            {addressList && addressList.length > 0 ? (
              addressList
                .filter(address => address && address._id) // <-- Filter out invalid entries
                .map((address) => (
                  <SelectItem key={address._id} value={address._id}>
                    {address.address}, {address.city} ({address.pincode})
                  </SelectItem>
                ))
            ) : (
              <div className="text-gray-500 text-sm px-4 py-2">No Address Available</div>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Address Cards Section */}
      <div className="space-y-4">
        {addressList && addressList.length > 0 ? (
          addressList
            .filter(addressInfo => addressInfo && addressInfo._id) // <-- Filter out invalid entries
            .map((addressInfo) => (
              <AddressCards
                key={addressInfo._id}
                addressInfo={addressInfo}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
        ) : (
          <p className="text-center text-gray-500">No Address Added Yet</p>
        )}
      </div>

      {/* Divider Line */}
      <hr className="border-t border-gray-200" />

      {/* Form Section */}
      <CardHeader className="space-y-2 p-0">
        <CardTitle className="text-xl font-bold text-black">
          {getCurrentEditId === null ? 'Add New Address' : 'Edit Address'}
        </CardTitle>

        <CardContent className="p-0 mt-2">
          <CommonForm
            formControls={formControlsShopAddress}
            buttonText={getCurrentEditId === null ? 'Add' : 'Edit'}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmitAddress}
            isBtnDisable={!isValidForm()}
          />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Addresses;
