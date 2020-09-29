import React from 'react'

class RewardsRow extends React.Component {
    render() {
        const category = this.props.category;
        return (
            <tr>
                <td colSpan="2">{category}</td>
            </tr>
        )

    }
}

class CustomerInfoRow extends React.Component {
    render() {
        const customer  = this.props.customer;
        return (
            <tr>
                <td>{customer.name}</td>
                <td>{customer.month}</td>
                <td>{customer.numTransactions}</td>
                <td>{customer.points}</td>
            </tr>
        );

    }
}