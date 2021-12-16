import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout.component';

const RentalDetailPage = () => {
    const {rentalId} = useParams();
    console.log(rentalId)
    return (
        <Layout>
            <div className="mt-3">
                <h1>Chi tiết đơn thuê</h1>
            </div>
        </Layout>
    )
}

export default RentalDetailPage;