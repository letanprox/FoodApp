CREATE DATABASE FOODAPP;
USE FOOAPP;

CREATE TABLE [dbo].[CUAHANG](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TEN] [nvarchar](200) NULL,
	[MOTA] [nvarchar](300) NULL,
	[ANH] [nvarchar](300) NULL,
	[DANHGIA] [float] NULL,
	[GIATB] [float] NULL,
	[THOIGIANMO] [nvarchar](30) NULL,
	[VITRI] [nvarchar](300) NULL,
	[ID_LOAISANPHAM] [int] NULL,
	[TENDANGNHAP] [nvarchar](300) NULL,
	[MATKHAU] [nvarchar](300) NULL
)

CREATE TABLE [dbo].[DONHANG](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NGAYDAT] [date] NULL,
	[GIA] [float] NULL,
	[TRANGTHAI] [nvarchar](30) NULL,
	[ID_USERS] [int] NOT NULL
)

CREATE TABLE [dbo].[DONHANG_SANPHAM](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_DONHANG] [int] NOT NULL,
	[ID_SANPHAM] [int] NOT NULL,
	[SOLUONG] [int] NOT NULL
) 


CREATE TABLE [dbo].[LOAISANPHAM](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TEN] [nvarchar](100) NULL,
	[ANH] [nvarchar](300) NULL
)

CREATE TABLE [dbo].[SANPHAM](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TEN] [nvarchar](200) NULL,
	[SOLUONGBAN] [int] NULL,
	[ANH] [nvarchar](300) NULL,
	[GIA] [float] NULL,
	[IDCUAHANG] [int] NULL
) 

CREATE TABLE [dbo].[USER_CUAHANG](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_USER] [int] NOT NULL,
	[ID_CUAHANG] [int] NOT NULL,
	[DANHGIA] [float] NULL,
	[MARK] [int] NULL
) 

CREATE TABLE [dbo].[USERS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TEN] [nvarchar](200) NULL,
	[ANH] [nvarchar](300) NULL,
	[EMAIL] [nvarchar](200) NULL,
	[MATKHAU] [nvarchar](200) NULL,
	[SDT] [nvarchar](200) NULL,
	[DIACHI] [nvarchar](400) NULL
)