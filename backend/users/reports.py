from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.units import inch
from datetime import datetime

def generate_pdf_report(user, data):
    """
    Generates a PDF report for the user based on provided data.
    """
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=24,
        spaceAfter=30,
        alignment=1, # Center
        textColor=colors.HexColor("#04344c")
    )
    
    section_style = ParagraphStyle(
        'SectionStyle',
        parent=styles['Heading2'],
        fontSize=16,
        spaceBefore=20,
        spaceAfter=10,
        textColor=colors.HexColor("#139fbd")
    )
    
    normal_style = styles["Normal"]
    
    elements = []
    
    # Title
    report_type = "Community-Wide Report" if user.role == 'Admin' else "Personal Activity Report"
    elements.append(Paragraph(f"BCRSS {report_type}", title_style))
    elements.append(Paragraph(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", normal_style))
    elements.append(Paragraph(f"Prepared for: {user.first_name} {user.last_name} ({user.username})", normal_style))
    elements.append(Spacer(1, 0.2 * inch))
    
    # Resources Section
    elements.append(Paragraph("Resources Summary", section_style))
    res_data = [["Title", "Category", "Status", "Owner" if user.role == 'Admin' else "Lending Type"]]
    for res in data.get('resources', []):
        owner_name = f"{res.owner.first_name} {res.owner.last_name}" if res.owner.first_name else res.owner.username
        row = [
            res.title, 
            res.category, 
            res.status, 
            owner_name if user.role == 'Admin' else res.lending_type
        ]
        res_data.append(row)
    
    if len(res_data) > 1:
        t = Table(res_data, colWidths=[2.5*inch, 1.2*inch, 1*inch, 1.8*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#04344c")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor("#f3fcff")),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor("#b0edf9"))
        ]))
        elements.append(t)
    else:
        elements.append(Paragraph("No resources listed yet.", normal_style))
    
    # Jobs Section
    elements.append(Paragraph("Job Opportunities Summary", section_style))
    job_data = [["Title", "Category", "Rate", "Status"]]
    for job in data.get('jobs', []):
        job_data.append([job.title, job.category, job.rate, job.status])
    
    if len(job_data) > 1:
        t = Table(job_data, colWidths=[2.5*inch, 1.5*inch, 1.5*inch, 1*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#04344c")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor("#b0edf9"))
        ]))
        elements.append(t)
    else:
        elements.append(Paragraph("No jobs posted yet.", normal_style))

    # Requests Section
    elements.append(Paragraph("Borrowing Requests Summary", section_style))
    req_data = [["Item", "Requester", "Owner", "Status"]]
    for req in data.get('requests', []):
        requester_name = f"{req.requester.first_name} {req.requester.last_name}" if req.requester.first_name else req.requester.username
        owner_name = f"{req.owner.first_name} {req.owner.last_name}" if req.owner.first_name else req.owner.username
        req_data.append([req.item.title, requester_name, owner_name, req.status])
    
    if len(req_data) > 1:
        t = Table(req_data, colWidths=[2.2*inch, 1.5*inch, 1.5*inch, 1.3*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#04344c")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor("#b0edf9"))
        ]))
        elements.append(t)
    else:
        elements.append(Paragraph("No requests recorded yet.", normal_style))

    # Footer
    elements.append(Spacer(1, 0.5 * inch))
    elements.append(Paragraph("End of Report - BCRSS Community Platform", normal_style))
    
    doc.build(elements)
    buffer.seek(0)
    return buffer
