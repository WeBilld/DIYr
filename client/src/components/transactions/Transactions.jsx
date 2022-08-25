import Transaction from '../transaction/Transaction';
import './transactions.css';

export default function Transactions() {
    return (
        <div className="transactionsContainer">
            <div className="transactionsWrapper">
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
                <Transaction />
            </div>
        </div>
    )
}
