import inquirer from "inquirer";

class BankAccount {
    protected accountNumber: number;
    protected accountHolder: string;
    protected balance: number;
    protected transactions: string[];

    constructor(accountNumber: number, accountHolder: string, initialBalance: number = 0) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.transactions = [];
    }

    // Deposit Method
    deposit(amount: number): void {
        if (amount <= 0) {
            console.log("Invalid deposit amount!");
            return;
        }
        if (amount > 100) {
            amount -= 1; // $1 fee if deposit > $100
        }
        this.balance += amount;
        this.transactions.push(`Deposited: $${amount}`);
        console.log(`✅ Deposit of $${amount} successful. Current Balance: $${this.balance}`);
    }

    // Withdraw Method
    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Invalid withdrawal amount!");
            return;
        }
        if (amount > this.balance) {
            console.log("❌ Insufficient funds!");
            return;
        }
        this.balance -= amount;
        this.transactions.push(`Withdrawn: $${amount}`);
        console.log(`✅ Withdrawal of $${amount} successful. Current Balance: $${this.balance}`);
    }

    // Apply Interest Method
    applyInterest(rate: number): void {
        if (rate <= 0) {
            console.log("Invalid interest rate!");
            return;
        }
        const interest = this.balance * (rate / 100);
        this.balance += interest;
        this.transactions.push(`Interest Added: $${interest.toFixed(2)}`);
        console.log(`💰 Interest of $${interest.toFixed(2)} applied. New Balance: $${this.balance}`);
    }

    // Get Balance
    getBalance(): number {
        return this.balance;
    }

    // Show Transaction History
    showTransactions(): void {
        console.log(`📜 Transaction History for ${this.accountHolder}:`);
        this.transactions.forEach((t, i) => {
            console.log(`${i + 1}. ${t}`);
        });
    }
}

class SavingsAccount extends BankAccount {
    constructor(accountNumber: number, accountHolder: string, initialBalance: number = 0) {
        super(accountNumber, accountHolder, initialBalance);
    }

    // Savings accounts get 5% yearly interest
    addYearlyInterest(): void {
        this.applyInterest(5);
    }
}

class CurrentAccount extends BankAccount {
    private overdraftLimit: number;

    constructor(accountNumber: number, accountHolder: string, initialBalance: number = 0, overdraftLimit: number = 500) {
        super(accountNumber, accountHolder, initialBalance);
        this.overdraftLimit = overdraftLimit;
    }

    // Override withdraw method to allow overdraft
    withdraw(amount: number): void {
        if (amount <= 0) {
            console.log("Invalid withdrawal amount!");
            return;
        }
        if (amount > this.balance + this.overdraftLimit) {
            console.log("❌ Withdrawal exceeds overdraft limit!");
            return;
        }
        this.balance -= amount;
        this.transactions.push(`Withdrawn: $${amount} (Overdraft Allowed)`);
        console.log(`✅ Withdrawal of $${amount} successful. Current Balance: $${this.balance}`);
    }
}

// Create Accounts
const savingAcc = new SavingsAccount(101, "Syed Naveed Khalid", 1000);
const currentAcc = new CurrentAccount(102, "Ahmed Ali", 500);

// Perform Transactions
savingAcc.deposit(200);
savingAcc.withdraw(150);
savingAcc.addYearlyInterest();
savingAcc.showTransactions();
console.log("Final Saving Balance:", savingAcc.getBalance());

console.log("-------------------------------------------------");

currentAcc.deposit(300);
currentAcc.withdraw(700);  // Overdraft allowed
currentAcc.showTransactions();
console.log("Final Current Balance:", currentAcc.getBalance());