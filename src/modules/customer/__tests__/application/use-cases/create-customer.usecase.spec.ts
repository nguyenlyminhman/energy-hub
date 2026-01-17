import { CreateCustomerUseCase } from "@/modules/customer/application/use-cases/create-customer.usecase";
import { CustomerEntity } from "@/modules/customer/domain/entities/customer.entity";
import { ICustomerRepository } from "@/modules/customer/domain/repositories/customer.repository";


describe('CreateCustomerUseCase', () => {
	let useCase: CreateCustomerUseCase;
	let customerRepo: jest.Mocked<ICustomerRepository>;

	beforeEach(() => {
		customerRepo = {
			findById: jest.fn(),
			findByCode: jest.fn(),
			findAll: jest.fn(),
			save: jest.fn()
		} as jest.Mocked<ICustomerRepository>;

		useCase = new CreateCustomerUseCase(customerRepo)
	})

	it('should create customer successfully', async () => {
		customerRepo.findByCode.mockResolvedValue(null);
		const customerCmd = {
			customerCode: 'cus-code',
			description: 'description',
			createdBy: 'system'
		}

		const rs = await useCase.execute(customerCmd);

		expect(customerRepo.findByCode).toHaveBeenCalledWith('CUS-CODE');
		expect(customerRepo.save).toHaveBeenCalledTimes(1);

		const savedCus = customerRepo.save.mock.calls[0][0] as CustomerEntity

		expect(savedCus.customerCode).toBe('CUS-CODE');
		expect(savedCus.description).toBe('description');

		expect(rs).toBeDefined()
		expect(rs.customerCode).toBe('CUS-CODE');

	});

	it('should return customer exist', async () => {

	});

});
