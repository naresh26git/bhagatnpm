import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const main = async () => {
  return await prisma.$transaction(async (tx) => {
    await tx.address.deleteMany();
    await tx.familyDetail.deleteMany();
    await tx.leave.deleteMany();
    await tx.payRoll.deleteMany();

    const { id: systemRoleId } = await tx.role.upsert({
      create: {
        name: "system",
      },
      update: {
        name: "system",
      },
      select: {
        id: true,
      },
      where: {
        name: "system",
      },
    });

    const { id: systemUserId } = await tx.user.upsert({
      create: {
        name: "System",
        password: "system",
        username: "system",
        roleId: systemRoleId,
      },
      update: {
        name: "System",
        password: "system",
        username: "system",
        roleId: systemRoleId,
      },
      where: {
        username: "system",
      },
      select: {
        id: true,
      },
    });

    const [{ id: defaultUserStatusId }] = await Promise.all(
      [
        {
          name: "active",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "inactive",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((userStatus) =>
        tx.userStatus.upsert({
          create: userStatus,
          update: userStatus,
          where: { name: userStatus.name },
          select: { id: true },
        })
      )
    );

    const [{ id: adminRoleId }, { id: employeeRoleId }] = await Promise.all(
      [
        {
          name: "admin",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "employee",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((role) =>
        tx.role.upsert({
          create: role,
          update: role,
          where: {
            name: role.name,
          },
          select: {
            id: true,
          },
        })
      )
    );

    const { id: balajiUserId } = await tx.user.upsert({
      create: {
        name: "Balaji",
        password: "balaji",
        username: "balaji",
        roleId: adminRoleId,
        createdById: systemUserId,
        updatedById: systemUserId,
        statusId: defaultUserStatusId,
      },
      update: {
        name: "Balaji",
        password: "balaji",
        username: "balaji",
        roleId: adminRoleId,
        createdById: systemUserId,
        updatedById: systemUserId,
        statusId: defaultUserStatusId,
      },
      where: {
        username: "balaji",
      },
      select: {
        id: true,
      },
    });

    const { id: muraliUserId } = await tx.user.upsert({
      create: {
        name: "Murali",
        password: "murali",
        username: "murali",
        roleId: employeeRoleId,
        createdById: balajiUserId,
        updatedById: balajiUserId,
        statusId: defaultUserStatusId,
      },
      update: {
        name: "Murali",
        password: "murali",
        username: "murali",
        roleId: employeeRoleId,
        createdById: balajiUserId,
        updatedById: balajiUserId,
        statusId: defaultUserStatusId,
      },
      where: {
        username: "murali",
      },
      select: {
        id: true,
      },
    });

    const { id: sakthiUserId } = await tx.user.upsert({
      create: {
        name: "Sakthi",
        password: "sakthi",
        username: "sakthi",
        roleId: employeeRoleId,
        createdById: balajiUserId,
        updatedById: balajiUserId,
        statusId: defaultUserStatusId,
      },
      update: {
        name: "Sakthi",
        password: "sakthi",
        username: "sakthi",
        roleId: employeeRoleId,
        createdById: balajiUserId,
        updatedById: balajiUserId,
        statusId: defaultUserStatusId,
      },
      where: {
        username: "sakthi",
      },
      select: {
        id: true,
      },
    });
    const { id: danielUserId } = await tx.user.upsert({
      create: {
        name: "Daniel",
        password: "daniel",
        username: "daniel",
        roleId: employeeRoleId,
        createdById: balajiUserId,
        updatedById: balajiUserId,
        statusId: defaultUserStatusId,
      },
      update: {
        name: "Daniel",
        password: "daniel",
        username: "daniel",
        roleId: employeeRoleId,
        createdById: balajiUserId,
        updatedById: balajiUserId,
        statusId: defaultUserStatusId,
      },
      where: {
        username: "daniel",
      },
      select: {
        id: true,
      },
    });
    const { id: naveenUserId } = await tx.user.upsert({
      create: {
        name: "Naveen",
        password: "naveen",
        username: "naveen",
        roleId: employeeRoleId,
        createdById: balajiUserId,
        updatedById: balajiUserId,
        statusId: defaultUserStatusId,
      },
      update: {
        name: "Naveen",
        password: "naveen",
        username: "naveen",
        roleId: employeeRoleId,
        createdById: balajiUserId,
        updatedById: balajiUserId,
        statusId: defaultUserStatusId,
      },
      where: {
        username: "naveen",
      },
      select: {
        id: true,
      },
    });
    const [{ id: developmentDepartmentId }, { id: designDepartmentId }] =
      await Promise.all(
        [
          {
            name: "Development",
            createdById: balajiUserId,
            updatedById: balajiUserId,
          },
          // {
          //   name: "Development",
          //   createdById: balajiUserId,
          //   updatedById: balajiUserId,
          // },
          {
            name: "Design",
            createdById: balajiUserId,
            updatedById: balajiUserId,
          },
        ].map((department) =>
          tx.department.upsert({
            create: department,
            update: department,
            where: {
              name: department.name,
            },
            select: {
              id: true,
            },
          })
        )
      );

    const [
      { id: JuniorFullstackDeveloperDesignationId },
      { id: JuniorProductDesignerDesignationId },
    ] = await Promise.all(
      [
        {
          name: "Junior Fullstack Developer",
          departmentId: developmentDepartmentId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
        },
        {
          name: "Junior Fullstack Developer",
          departmentId: developmentDepartmentId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
        },
        {
          name: "Junior Product Designer",
          departmentId: designDepartmentId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
        },
        {
          name: "Junior Product Designer",
          departmentId: designDepartmentId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
        },
      ].map((department) =>
        tx.designation.upsert({
          create: department,
          update: department,
          where: {
            name: department.name,
          },
          select: {
            id: true,
          },
        })
      )
    );

    const [
      // { id: ryanPersonalInfoId },
      // { id: davidPersonalInfoId }
    ] = await Promise.all(
      [
        {
          dateOfBirth: new Date(new Date().setFullYear(1995, 5, 25)),
          dateOfJoining: new Date(new Date().setFullYear(2023, 4, 28)),
          firstName: "Murali",
          lastName: "Dharan",
          departmentId: developmentDepartmentId,
          designationId: JuniorFullstackDeveloperDesignationId,
          reportingManagerUserId: balajiUserId,
          userId: muraliUserId,
          createdById: muraliUserId,
          updatedById: muraliUserId,
        },
        {
          dateOfBirth: new Date(new Date().setFullYear(1998, 12, 23)),
          dateOfJoining: new Date(new Date().setFullYear(2023, 4, 25)),
          firstName: "Shiva",
          lastName: "Sakthi",
          departmentId: developmentDepartmentId,
          designationId: JuniorFullstackDeveloperDesignationId,
          reportingManagerUserId: balajiUserId,
          userId: sakthiUserId,
          createdById: sakthiUserId,
          updatedById: sakthiUserId,
        },
        {
          dateOfBirth: new Date(new Date().setFullYear(2000, 4, 4)),
          dateOfJoining: new Date(new Date().setFullYear(2023, 5, 22)),
          firstName: "Daniel",
          lastName: "Eben",
          departmentId: designDepartmentId,
          designationId: JuniorProductDesignerDesignationId,
          reportingManagerUserId: balajiUserId,
          userId: danielUserId,
          createdById: danielUserId,
          updatedById: danielUserId,
        },
        {
          dateOfBirth: new Date(new Date().setFullYear(2001, 10, 24)),
          dateOfJoining: new Date(new Date().setFullYear(2023, 2, 22)),
          firstName: "Naveen",
          lastName: "Kumar",
          departmentId: designDepartmentId,
          designationId: JuniorProductDesignerDesignationId,
          reportingManagerUserId: balajiUserId,
          userId: naveenUserId,
          createdById: naveenUserId,
          updatedById: naveenUserId,
        },
      ].map((personalInfo) =>
        tx.personalInfo.upsert({
          create: personalInfo,
          update: personalInfo,
          where: {
            userId: personalInfo.userId,
          },
          select: {
            id: true,
          },
        })
      )
    );

    const [{ id: defaultAddressTypeId }] = await Promise.all(
      [
        {
          name: "residential",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "others",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((addressType) =>
        tx.addressType.upsert({
          create: addressType,
          update: addressType,
          where: { name: addressType.name },
          select: { id: true },
        })
      )
    );

    const [
      // { id: ryanResidentialAddressId },
      // { id: davidResidentialAddressId },
    ] = await Promise.all(
      [
        {
          city: "Thiruvannamalai",
          country: "India",
          pincode: "606906",
          state: "Tamil Nadu",
          street: "Nadu Street",
          createdById: muraliUserId,
          updatedById: muraliUserId,
          userId: muraliUserId,
          addressTypeId: defaultAddressTypeId,
        },
        {
          city: "Thiruvarur",
          country: "India",
          pincode: "614020",
          state: "Tamil Nadu",
          street: "Anna Street",
          createdById: sakthiUserId,
          updatedById: sakthiUserId,
          userId: sakthiUserId,
          addressTypeId: defaultAddressTypeId,
        },
        {
          city: "Tenkasi",
          country: "India",
          pincode: "627806",
          state: "Tamil Nadu",
          street: "Keela Divaganapuram Street",
          createdById: danielUserId,
          updatedById: danielUserId,
          userId: danielUserId,
          addressTypeId: defaultAddressTypeId,
        },
        {
          city: "Chennai",
          country: "India",
          pincode: "603202",
          state: "Tamil Nadu",
          street: "Guduvancherry",
          createdById: naveenUserId,
          updatedById: naveenUserId,
          userId: naveenUserId,
          addressTypeId: defaultAddressTypeId,
        },
      ].map((address) =>
        tx.address.create({
          data: address,
          select: {
            id: true,
          },
        })
      )
    );

    const [{ id: defaultRelationshipTypeId }] = await Promise.all(
      [
        {
          name: "father",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "mother",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "guardian",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "brother",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "sister",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "spouse",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "son",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "daughter",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((relationshipType) =>
        tx.relationshipType.upsert({
          create: relationshipType,
          update: relationshipType,
          where: {
            name: relationshipType.name,
          },
          select: { id: true },
        })
      )
    );

    const [
      // { id: muraliFatherFamilyDetailId },
      // { id: sakthiFatherFamilyDetailId },
    ] = await Promise.all(
      [
        {
          dateOfBirth: new Date(new Date().setFullYear(1962, 7, 17)),
          name: "Thangamani",
          relationshipTypeId: defaultRelationshipTypeId,
          createdById: muraliUserId,
          updatedById: muraliUserId,
          userId: muraliUserId,
        },
        {
          dateOfBirth: new Date(new Date().setFullYear(1969, 6, 11)),
          name: "Chandrasekaran",
          relationshipTypeId: defaultRelationshipTypeId,
          createdById: sakthiUserId,
          updatedById: sakthiUserId,
          userId: sakthiUserId,
        },
        {
          dateOfBirth: new Date(new Date().setFullYear(1971, 9, 10)),
          name: "Eben Gunaseelan",
          relationshipTypeId: defaultRelationshipTypeId,
          createdById: danielUserId,
          updatedById: danielUserId,
          userId: danielUserId,
        },
        {
          dateOfBirth: new Date(new Date().setFullYear(1969, 7, 23)),
          name: "Suresh Kumar",
          relationshipTypeId: defaultRelationshipTypeId,
          createdById: naveenUserId,
          updatedById: naveenUserId,
          userId: naveenUserId,
        },
      ].map((familyDetail) =>
        tx.familyDetail.create({
          data: familyDetail,
          select: {
            id: true,
          },
        })
      )
    );

    const [{ id: defaultTimeSheetStatusId }] = await Promise.all(
      [
        {
          name: "present",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "absent",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((timeSheetStatus) =>
        tx.timeSheetStatus.upsert({
          create: timeSheetStatus,
          update: timeSheetStatus,
          where: { name: timeSheetStatus.name },
          select: { id: true },
        })
      )
    );

    const [
      // { id: ryanTimeSheetId },
      // { id: davidTimeSheetId }
    ] = await Promise.all(
      [
        {
          inTime: new Date(
            new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
              10,
              0
            )
          ),
          outTime: new Date(
            new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
              18,
              0
            )
          ),
          userId: muraliUserId,
          updatedById: muraliUserId,
          createdById: muraliUserId,
          statusId: defaultTimeSheetStatusId,
        },
        {
          inTime: new Date(
            new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
              9,
              0
            )
          ),
          outTime: new Date(
            new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
              17,
              0
            )
          ),
          userId: sakthiUserId,
          updatedById: sakthiUserId,
          createdById: sakthiUserId,
          statusId: defaultTimeSheetStatusId,
        },
        {
          inTime: new Date(
            new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
              11,
              0
            )
          ),
          outTime: new Date(
            new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
              18,
              0
            )
          ),
          userId: danielUserId,
          updatedById: danielUserId,
          createdById: danielUserId,
          statusId: defaultTimeSheetStatusId,
        },
        {
          inTime: new Date(
            new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
              9,
              0
            )
          ),
          outTime: new Date(
            new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
              17,
              0
            )
          ),
          userId: naveenUserId,
          updatedById: naveenUserId,
          createdById: naveenUserId,
          statusId: defaultTimeSheetStatusId,
        },
      ].map((timeSheet) =>
        tx.timeSheet.create({
          data: timeSheet,
          select: {
            id: true,
          },
        })
      )
    );

    const [
      { id: muraliSalaryId },
      { id: sakthiSalaryId },
      { id: danielSalaryId },
      { id: naveenSalaryId },
    ] = await Promise.all(
      [
        {
          amount: 20000,
          userId: muraliUserId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
        },
        {
          amount: 20000,
          userId: sakthiUserId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
        },
        {
          amount: 20000,
          userId: danielUserId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
        },
        {
          amount: 20000,
          userId: naveenUserId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
        },
      ].map((salary) =>
        tx.salary.upsert({
          create: salary,
          update: salary,
          where: {
            userId: salary.userId,
          },
          select: {
            id: true,
          },
        })
      )
    );

    const [{ id: defaultPayRollStatusId }] = await Promise.all(
      [
        {
          name: "success",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "pending",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "processing",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "declined",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((payRollStatus) =>
        tx.payRollStatus.upsert({
          create: payRollStatus,
          update: payRollStatus,
          where: { name: payRollStatus.name },
          select: { id: true },
        })
      )
    );

    const [] = await Promise.all(
      [
        {
          name: "it",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "health",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "work",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "payment",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((helpDeskCategory) =>
        tx.helpDeskCategory.upsert({
          create: helpDeskCategory,
          update: helpDeskCategory,
          where: {
            name: helpDeskCategory.name,
          },
          select: { id: true },
        })
      )
    );

    const [] = await Promise.all(
      [
        {
          name: "cancelled",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "pending",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "resolved",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((helpDeskStatus) =>
        tx.helpDeskStatus.upsert({
          create: helpDeskStatus,
          update: helpDeskStatus,
          where: { name: helpDeskStatus.name },
          select: { id: true },
        })
      )
    );

    const [
      { id: aadharIdentificationTypeId },
      { id: panIdentificationTypeId },
    ] = await Promise.all(
      [
        {
          name: "Aadhaar",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "PAN",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((identificationType) =>
        tx.identificationType.upsert({
          create: identificationType,
          update: identificationType,
          where: {
            name: identificationType.name,
          },
          select: { id: true },
        })
      )
    );
    const [] = await Promise.all(
      [
        {
          typeId: aadharIdentificationTypeId,
          number: "876323450987",
          userId: sakthiUserId,
          createdById: sakthiUserId,
          updatedById: sakthiUserId,
        },
        {
          typeId: panIdentificationTypeId,
          number: "HOPSR1236P",
          userId: muraliUserId,
          createdById: muraliUserId,
          updatedById: muraliUserId,
        },
      ].map((identification) =>
        tx.identification.create({
          data: identification,
          select: {
            id: true,
          },
        })
      )
    );
    const [{ id: clubitsCompanyId }, { id: genyusCompanyId }] =
      await Promise.all(
        [
          {
            name: "clubits",
            createdById: systemUserId,
            updatedById: systemUserId,
          },
          {
            name: "genyus",
            createdById: systemUserId,
            updatedById: systemUserId,
          },
        ].map((company) =>
          tx.company.upsert({
            create: company,
            update: company,
            where: {
              name: company.name,
            },
            select: { id: true },
          })
        )
      );

    const [] = await Promise.all(
      [
        {
          userId: balajiUserId,
          companyId: clubitsCompanyId,
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          userId: balajiUserId,
          companyId: genyusCompanyId,
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((hr) =>
        tx.hr.upsert({
          create: hr,
          update: hr,
          where: {
            userId: hr.userId,
          },
          select: { id: true },
        })
      )
    );

    const [
      // { id: ryanPayRollId },
      // { id: davidPayRollId }
    ] = await Promise.all(
      [
        {
          month: new Date(new Date().setMonth(new Date().getMonth() - 1, 0)),
          salaryId: muraliSalaryId,
          userId: muraliUserId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
          statusId: defaultPayRollStatusId,
        },
        {
          month: new Date(new Date().setMonth(new Date().getMonth() - 1, 0)),
          salaryId: sakthiSalaryId,
          userId: sakthiUserId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
          statusId: defaultPayRollStatusId,
        },
        {
          month: new Date(new Date().setMonth(new Date().getMonth() - 1, 0)),
          salaryId: danielSalaryId,
          userId: danielUserId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
          statusId: defaultPayRollStatusId,
        },
        {
          month: new Date(new Date().setMonth(new Date().getMonth() - 1, 0)),
          salaryId: naveenSalaryId,
          userId: naveenUserId,
          createdById: balajiUserId,
          updatedById: balajiUserId,
          statusId: defaultPayRollStatusId,
        },
      ].map((payRoll) =>
        tx.payRoll.create({
          data: payRoll,
          select: {
            id: true,
          },
        })
      )
    );

    const [{ id: sickLeaveTypeId }, { id: casualLeaveTypeId }] =
      await Promise.all(
        [
          {
            name: "Sick Leave",
            daysAlloted: 24,
            createdById: balajiUserId,
            updatedById: balajiUserId,
          },
          {
            name: "Casual Leave",
            daysAlloted: 12,
            createdById: balajiUserId,
            updatedById: balajiUserId,
          },
        ].map((leaveType) =>
          tx.leaveType.upsert({
            create: leaveType,
            update: leaveType,
            where: {
              name: leaveType.name,
            },
            select: {
              id: true,
            },
          })
        )
      );

    const [{ id: defaultLeaveStatusId }] = await Promise.all(
      [
        {
          name: "pending",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "accepted",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
        {
          name: "rejected",
          createdById: systemUserId,
          updatedById: systemUserId,
        },
      ].map((leaveStatus) =>
        tx.leaveStatus.upsert({
          create: leaveStatus,
          update: leaveStatus,
          where: { name: leaveStatus.name },
          select: { id: true },
        })
      )
    );

    const [] = await Promise.all(
      [
        {
          fromDate: new Date(new Date().setDate(new Date().getDate() - 2)),
          toDate: new Date(new Date().setDate(new Date().getDate() - 1)),
          noOfDays: 1,
          createdById: muraliUserId,
          updatedById: muraliUserId,
          leaveTypeId: sickLeaveTypeId,
          userId: muraliUserId,
          remarks: "Please consider.",
          statusId: defaultLeaveStatusId,
        },
        {
          fromDate: new Date(new Date().setDate(new Date().getDate() - 3)),
          toDate: new Date(new Date().setDate(new Date().getDate() - 2)),
          noOfDays: 1,
          createdById: sakthiUserId,
          updatedById: sakthiUserId,
          leaveTypeId: casualLeaveTypeId,
          userId: sakthiUserId,
          remarks: "Please consider.",
          statusId: defaultLeaveStatusId,
        },
        {
          fromDate: new Date(new Date().setDate(new Date().getDate() - 4)),
          toDate: new Date(new Date().setDate(new Date().getDate() - 3)),
          noOfDays: 1,
          createdById: danielUserId,
          updatedById: danielUserId,
          leaveTypeId: sickLeaveTypeId,
          userId: danielUserId,
          remarks: "Please consider.",
          statusId: defaultLeaveStatusId,
        },
        {
          fromDate: new Date(new Date().setDate(new Date().getDate() - 3)),
          toDate: new Date(new Date().setDate(new Date().getDate() - 2)),
          noOfDays: 1,
          createdById: naveenUserId,
          updatedById: naveenUserId,
          leaveTypeId: casualLeaveTypeId,
          userId: naveenUserId,
          remarks: "Please consider.",
          statusId: defaultLeaveStatusId,
        },
      ].map((leave) =>
        tx.leave.create({
          data: leave,
          select: {
            id: true,
          },
        })
      )
    );
  });
};

main()
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
